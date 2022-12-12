import * as React from 'react';
import { View, Text } from 'react-native';

export default function AboutScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                style={{ fontSize: 20, fontWeight: 'bold' }}>Askar Bulabayev, 101322619</Text>
                <Text
                style={{ fontSize: 20, fontWeight: 'bold' }}>Arnur Azangaliyev, 101322803</Text>
                <Text
                style={{ fontSize: 20, fontWeight: 'bold' }}>Artem Sharipov, 101330469</Text>
        </View>
    );
}