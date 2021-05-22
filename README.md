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

