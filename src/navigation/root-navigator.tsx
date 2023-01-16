import { ReactElement } from 'react';

import { CameraScreen, HomeScreen } from '../screens';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();

export const RootNavigator = (): ReactElement => {

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <MaterialIcons name="home" size={24} color="black" />
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarIcon: ({ focused }) => <MaterialIcons name="camera" size={24} color="black" />
        }}
      />
    </Tab.Navigator>
  );
};
