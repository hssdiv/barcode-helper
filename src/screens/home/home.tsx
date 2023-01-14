import { ReactElement, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Barcode from 'react-native-barcode-expo';
import { useProducts } from '../../stores';

export const HomeScreen = (): ReactElement => {

  const [value, setValue] = useState('');

  const { products, addProduct, removeProduct } = useProducts();

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      {products.map(product => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => setValue(product)}
            style={{
              paddingBottom: 12,
            }}
          >
            <Text style={{ color: 'blue' }}>{product}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeProduct(product)}
            style={{
              paddingBottom: 12,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: 'red' }}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text>Type value...</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center'

        }}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: 'lightgrey',
            width: '50%',
            paddingVertical: 5,
            // marginBottom: 12,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            addProduct(value)
            setValue('')
          }}
        >
          <Text
            style={{
              color: 'blue',
              paddingStart: 10,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
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
