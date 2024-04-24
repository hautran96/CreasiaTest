import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { launchImageLibrary } from 'react-native-image-picker'
import axios from 'axios';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cccd, setCccd] = useState('');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [cccdPlaceOfIssue, setCccdPlaceOfIssue] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState(null); // Thêm state để lưu trữ hình ảnh
  const [confirmPass, setConfirmPass] = useState('')
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('hautran');
  const [dateCccd, setDateCccd] = useState('');

  const handleUpdateProfile = async () => {
    try {
      const body = {
        username: userName,
        passowrd: password,
        cccd: cccd,
        name: name,
        image: profileImage,
        id: employeeId,
        position: position,
        gender: selectedId,
        birthday: dateOfBirth,
        email: email,
        phoneNumber: phoneNumber,
        place: cccdPlaceOfIssue,
        dateCccd: dateCccd
      }

      const response = await axios.post('http://192.168.1.2:3000/edit', body)

      if (response.status === 200) {
        console.log('thanh cong')
      }
    } catch (error) {
      console.log('error', error)
    }
  };

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: false });
    if (result.assets) {
      setProfileImage(result.assets[0].uri)
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState('0');
  const [opacity] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    Animated.timing(opacity, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSelect = (value) => {
    setPosition(value);
    toggleDropdown();
  };


  const radioButtons: RadioButtonProps[] = useMemo(() => ([
    {
      id: '1',
      label: 'Nam',
      value: 'Nam'
    },
    {
      id: '2',
      label: 'Nữ',
      value: 'Nữ'
    }
  ]), []);

  const [selectedId, setSelectedId] = useState('1');

  useEffect(()=>{
    const loadData = async () => {
      const body = {
        username: userName
      }
      const response = await axios.post('http://192.168.1.2:3000/profile',body)
      if(response.status === 200){
        setCccd(response.data.cccd)
        setEmail(response.data.email)
        setName(response.data.name)
        setCccdPlaceOfIssue(response.data.place)
        setPassword(response.data.passowrd)
        setDateOfBirth(response.data.birthday)
        setProfileImage(response.data.image)
        setEmployeeId(response.data.id)
        setPhoneNumber(response.data.phoneNumber)
        setDateCccd(response.data.dateCccd)
        setSelectedId(response.data.gender)
        setPosition(response.data.position)
        setProfileImage(response.data.image)
      }
    }

    loadData()
  },[])

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={{ width: '100%', borderBottomWidth: 0.5, marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Photo: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.profileImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Text style={styles.profileImagePlaceholder}>Chọn hình ảnh</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Tên NV: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
      </View>


      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Mã NV: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={employeeId}
            onChangeText={(text) => setEmployeeId(text)}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Vị trí: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <View style={styles.container1}>
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
              <Text style={styles.selectedValue}>{position || 'Select'}</Text>
            </TouchableOpacity>
            {isOpen && (
              <Animated.View style={[styles.dropdownContent, { opacity }]}>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect('1')}>
                  <Text>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect('2')}>
                  <Text>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect('3')}>
                  <Text>3</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Giới tính: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <RadioGroup
            containerStyle={{ flexDirection: 'row', borderWidth: 1, marginBottom: 10, height: 40, borderRadius: 5, borderColor: '#ccc', width: '80%' }}
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Ngày Sinh: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            placeholder='Ngày sinh(dd\MMMM\yyyy)'
            value={dateOfBirth}
            onChangeText={(text) => setDateOfBirth(text)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Số CCCD/CMND: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            value={cccd}
            onChangeText={(text) => setCccd(text)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Email: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, marginRight: 10 }}> Ngày cấp: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            placeholder='Ngày cấp (dd\MMMM\yyyy)'
            value={dateCccd}
            onChangeText={(text) => setDateCccd(text)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}>Số điện thoại: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber}
            keyboardType='numeric'
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}> Nơi cấp: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            value={cccdPlaceOfIssue}
            onChangeText={(text) => setCccdPlaceOfIssue(text)}
          />
        </View>
      </View>

      <View style={{ width: '100%', borderBottomWidth: 0.5, marginBottom: 20 }}>
        <Text style={styles.sectionTitle}>Thông tin đăng nhập</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}> Tên đăng nhập: </Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}> Mật khẩu:</Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14 }}>Xác nhận mật khẩu</Text>
        </View>

        <View style={{ flex: 2 }}>
          <TextInput
            style={styles.input}
            value={confirmPass}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPass(text)}
          />
        </View>
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>CẬP NHẬT</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  profileImageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImagePlaceholder: {
    fontSize: 16,
    color: '#007bff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  container1: {
    position: 'relative',
    zIndex: 1,
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selectedValue: {
    color: '#333',
  },
  dropdownContent: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
  },
});

export default ProfileScreen;
