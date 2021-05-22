import Foundation

@objc public class Echo: NSObject {
    @objc public func echo(_ value: String) -> String {
        return value
    }
}
