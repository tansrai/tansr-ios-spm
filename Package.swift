// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "tansr-ios-spm",
    platforms: [.iOS(.v16), .macOS(.v13)],
    products: [
        .library(name: "TansrCore", targets: ["TansrCore"]),
        .library(name: "TansrClient", targets: ["TansrCore", "TansrClient"]),
        .library(name: "TansrUI", targets: ["TansrCore", "TansrClient", "TansrUI"])
    ],
    targets: [
        .binaryTarget(name: "TansrCore", url: "https://github.com/tansrai/tansr-ios-spm/releases/download/0.3.0/TansrCore.xcframework.zip", checksum: "93b65f1136529fc72b324be2ce74918c13611280f4a7b2f1777f2808b8038a27"),
        .binaryTarget(name: "TansrClient", url: "https://github.com/tansrai/tansr-ios-spm/releases/download/0.3.0/TansrClient.xcframework.zip", checksum: "06b0b6c0614290ddc74c611bbcc4bd1bc14c7120f90996ed30b6eaeaa9b82abd"),
        .binaryTarget(name: "TansrUI", url: "https://github.com/tansrai/tansr-ios-spm/releases/download/0.3.0/TansrUI.xcframework.zip", checksum: "d1311e1ad2a944d17953cfd3fbb0d7d97553f9637320b791f9636d408259f921")
    ]
)
