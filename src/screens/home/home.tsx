import { ReactElement, useState } from 'react';
import { Dimensions, Text, TextInput, View } from 'react-native';
import Barcode from 'react-native-barcode-expo';

export const HomeScreen = (): ReactElement => {

  const [value, setValue] = useState('');

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Text>Type value...</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={{
          width: '50%',
          backgroundColor: 'white',
          paddingVertical: 5,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: 'lightgrey',
          marginBottom: 12,
        }}
      />

      <View
        style={{
          width: '100%',
          height: 120,
          backgroundColor: 'white',
        }}
      >
        {value &&
          <Barcode
            value={value}
            format='CODE128' // CODE39
            height={100}
            width={2}
            textColor='black'
            lineColor='black'
            background='white'
          />
        }
      </View>
    </View>
  );
};
