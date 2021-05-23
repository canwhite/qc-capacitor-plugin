## qc-capacitor-plugin
capacitor plugin use

## init
```
npm i -g @capacitor/cli
npm init @capacitor/plugin
--------------------------
    init eg:
        1.name package
            echo
        2.directory
            echo
        3.id
            com.qc.test(安卓注册的时候要用com.qc.test.EchoPlugin)
        4.class name 
            Echo
        5.repo url
            git仓库地址
        6.author
            qiaochao
        7.license
            默认
        8.des
            test
----------------------------
cd moduleName
yarn install
yarn build

```


## note of using this plugin

具体的加载该项目的project中：

(1) android
1. 如果在本地通过相对位置导入，即npm i ../包名;  
 注意先yarn install, 然后yarn build,最后npm i ../包名
2. 为了保证com.getcapacitor.annotation.CapacitorPlugin存在，需要在project中使用的版本为"@capacitor/android": "^3.0.0-rc.0",
另外@capacitor/cli也可以用较新版本，我这里直接用了next
3. 最重要的一点：插件加载完之后，如果要正常使用需要在project里的mainAcitvity.java中注册，这个很重要，android中不注册不能使用
```
...
import com.qc.test.EchoPlugin;
...
public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(EchoPlugin.class);
    }});
  }
}


```

(2) ios  
1. 为了不用plugin中的最低支持platform高于project,需要保证
project中使用的版本为"@capacitor/ios": "3.0.0", @capacitor/cli也是next
2. xcode的版本升到最新，最新swift语法支持
3. 真机测试的时候注意用户和bundle id唯一
4. 最重要的一点，如果使用敏感权限，需要根据系统提示在info.plist中添加对应权限提示


## add

推荐本地加载
```

npm i ../moduleName

```
下边这种私有包的形式测试失败，不推荐

```
npm install git+ssh://git@github.com:canwhite/qc-capacitor-plugin.git

```


## echo des

```
how to write？

************************************************************************
首先在src/definitions.ts写好接口：
export interface EchoPlugin {
   //参数是，参数类型是有一组键值对的对象
   //返回值是resolve对象的promise
   echo(options: { value: string }): Promise<{ value: string }>;
}
---------------------------------
然后再src/web.ts中
import { WebPlugin } from '@capacitor/core';
import type { EchoPlugin } from './definitions';

export class EchoWeb extends WebPlugin implements EchoPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    //web可以在这里进行一些逻辑的编写，如果有向原生传值的内容就在下边return
    //这里相当于把我们传入的参数传递给了原生
    return options;
  }
}
---------------------------------
plugin中原生android部分
...
public class EchoPlugin extends Plugin {

    @PluginMethod
    public void echo(PluginCall call) {

        //借助PluginCall和getString方法
        //接收js传过来的value值
        String value = call.getString("value");

        //根据接收params的要求，作一些logic或者功能组件显示的操作

        //最后根据需要，通过jsObject返回给js需要的回调值
        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }
}

PS：
注意一点，android plugin具体在project中使用的时候，需要在project中android的MainActivity中
注册add()

************************************************************************
plugin中原生ios部分：
首先在EchoPlugin.m文件中宏定义插件和方法

//使用CAP_PLUGIN宏定义插件，然后插件使用CAP_PLUGIN_METHOD宏支持的每种方法。
CAP_PLUGIN(EchoPlugin, "Echo",
           CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)

这里也体现出ios这边和android这边的不同
android直接将插在MainActivity添加到了调度数组里，
而ios这边通过宏定义

---------------------------------
然后在EchoPlugin.swift中具体实现
实现思路和android差不过
@objc(EchoPlugin)
public class EchoPlugin: CAPPlugin {
    //这个类android也有，主要是给返回值作model，我们可以不要
    //private let implementation = Echo() 

    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            //"value": implementation.echo(value)
            "value": value
        ])
    }
}

PS:
因为ios中插件和方法都是宏定义的，所以也就不需要再哪里add了
主要是用到的一些权限根据xcode提示需要添加再info.plist里

******************************************************************
在project中install插件之后，通过ionic cap sync
会将plugin中实现的ios/android部分copy加载在原生项目中

js这边通过调用js部分的实现来唤起传值，原生这边执行提前写好的逻辑和回调

js唤起部分：


import {Echo} from 'echo'

var echo =  await Echo.echo({value:"hello"});
console.log(echo)//hello




```