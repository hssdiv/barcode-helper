import React from 'react';
import { Alert, LayoutChangeEvent, PixelRatio, Text, TouchableOpacity, View } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { OCRFrame, scanOCR } from "vision-camera-ocr";
import * as Clipboard from 'expo-clipboard';
import { useProducts } from '../../stores';

export const CameraScreen = () => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [ocr, setOcr] = React.useState<OCRFrame>();
  const [pixelRatio, setPixelRatio] = React.useState<number>(1);
  const devices = useCameraDevices();
  const device = devices.back;

  const { setCurrentProduct } =useProducts();
  
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const data = scanOCR(frame);
    runOnJS(setOcr)(data);
  }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const renderOverlay = () => {
    return (
      <>
        {ocr?.result.blocks.map((block) => {
          return (
            <TouchableOpacity
              onPress={async () => {
                await Clipboard.setStringAsync(block.text);
                setCurrentProduct(block.text);
                Alert.alert(`"${block.text}" copied to the clipboard`);
              }}
              style={{
                position: 'absolute',
                left: block.frame.x * pixelRatio,
                top: block.frame.y * pixelRatio,
                backgroundColor: 'rgba(255,255,255,0.3)',
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {block.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  return device !== undefined && hasPermission ? (
    <>
      <Camera
        style={{ flex: 1 }}
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        frameProcessorFps={1}
        onLayout={(event: LayoutChangeEvent) => {
          setPixelRatio(
            event.nativeEvent.layout.width /
            PixelRatio.getPixelSizeForLayoutSize(
              event.nativeEvent.layout.width
            )
          );
        }}
      />
      {renderOverlay()}
    </>
  ) : (
    <View>
      <Text>No available cameras</Text>
    </View>
  );
};
