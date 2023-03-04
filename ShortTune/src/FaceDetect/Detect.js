import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import* as FaceDetector  from 'expo-face-detector';

const Detector = ({navigation,route}) => {
  const [faces, setFaces] = useState([]);
  const [Expression,setExpression]  = useState('');
  console.log('detect route value ',route.params.data)
  console.log('inthis ', route.params.accessToken)

  

  const handleFacesDetected = ({ faces }) => {
    setFaces(faces);
  };

  const getExpression = (face) => {

    
    let expression = '';
    
  
  if (face.smilingProbability >= 0.80) {
      expression = 'happy';
    } else if (face.rightEyeOpenProbability >= 1.00 || face.leftEyeOpenProbability >= 0.96 && face.smilingProbability > 0.30 && face.smilingProbability <0.70) {
      expression = 'surprised';
    } else if (face.rightEyeOpenProbability>=0.98 && face.leftEyeOpenProbability >=0.98 && face.smilingProbability <=0.05) {
      expression = 'angry';
    } else if (face.smilingProbability >= 0.02 && face.smilingProbability <= 0.05 || face.leftEyeOpenProbability <=0.99 || face.rightEyeOpenProbability <=0.99  ) {
      expression = 'sad';
    } else {
      expression = 'neutral';
    }
 
    setTimeout(() => {
      if(expression){
        ()=>{
          setExpression(expression)
          console.log(expression)
          console.log('toen ' , route.params)
        }
        
        navigation.navigate('ResultScreen',{data:route.params.data,Expressionvalue:expression})
      }
      
    }, 3000);
   
    return expression

  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      <View style={styles.facesContainer}>
        {faces.map(face => (
          <View
            key={face.faceID}
            style={[
              styles.face,
              {
                left: face.bounds.origin.x,
                top: face.bounds.origin.y,
                width: face.bounds.size.width,
                height: face.bounds.size.height,
              },
            ]}
          >
            <Text style={styles.expressionText}>
              Smiling: {face.smilingProbability.toFixed(2)}
            </Text>
            
            <Text style={styles.expressionText}>
              Left Eye Open: {face.leftEyeOpenProbability.toFixed(2)}
            </Text>
            <Text style={styles.expressionText}>
              Right Eye Open: {face.rightEyeOpenProbability.toFixed(2)}
            </Text>
            <Text style={styles.expressionText}>
              Expression: {getExpression(face)}
            </Text>
            <Text style={styles.expressionText}>
              right eye position: {face.rightEyePosition}
          </Text> 
          
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  facesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  face: {
    borderWidth: 2,
    borderRadius: 1,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
  },
  expressionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Detector;
