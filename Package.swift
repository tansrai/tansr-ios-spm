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
        .binaryTarget(name: "TansrCore", url: "https://github.com/tansrai/tansr-ios-spm/releases/download/0.2.1/TansrCore.xcframework.zip", checksum: "0f53d78490bb4f1704bc29568b5a35d506ee09f80addd37a08631c93a10254b4"),
        .binaryTarget(name: "TansrClient", url: "https://github.com/tansrai/tansr-ios-spm/releases/download/0.2.1/TansrClient.xcframework.zip", checksum: "7828d9e1b536e17aa487e5cdc0349fc64f5a111a22de61c1fb08c034ec7dd29f"),
        .binaryTarget(name: "TansrUI", url: "https://github.com/tansrai/tansr-ios-spm/releases/download/0.2.1/TansrUI.xcframework.zip", checksum: "5375c438963f65fb2c45d3a3890cc0d882b923413908dcd4a7dfbd0b986026b7")
    ]
)
