import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Button, Text, Picker, } from 'react-native';
import { ScrollView } from 'react-native-web';
import { createTable, insertPatient } from './.expo/src/db';
const App = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [relationship, setRelationship] = useState('');
  const [notes, setNotes] = useState('');
  const [useDOB, setUseDOB] = useState(true);


  useEffect(() => {
    createTable();
  }, []);



  const handleRegister = () => {
    const chartCode = generatechartcode();
    insertPatient(chartCode, name, mobileNumber, gender, dob, age, relationship, notes);
    alert('Patient registered successfully!');
  }
  const generatechartcode = () => {
    return Math.random().toString(36).subString(2, 8).toUppercase();
  };
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text> patient mobileNumber</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
        keyboardType="numeric"
        maxlength={10}
        Value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <Text> patient name </Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
        value={name}
        onChangeText={setName}
      />
      <Text>patient gender</Text>
      <Picker selectedValue={gender} onValueChange={setGender} style={{ marginBottom: 15 }}>

        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />  {/* Corrected value case */}
        <Picker.Item label="Either" value="either" />  {/* Corrected value case */}
      </Picker>


      <Text> Date of birth or age</Text>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <Text onPress={() => setUseDOB(true)}>DOB</Text>
        <RadioButton selected={useDOB} onPress={() => setUseDOB(true)} />
        <Text onPress={() => setUseDOB(false)}>Age</Text>
        <RadioButton selected={!useDOB} onPress={() => setUseDOB(false)} />
      </View>

      {useDOB ? (
        <View>
          <Text>patient DOB </Text>
          <TextInput style={{ borderBottomWidth: 1, marginBottom: 15 }}
            value={dob}
            onChangeText={setDob}
          />
          /</View>
      ) : (
        <View>
          <Text>Patient Age</Text>
          <TextInput
            style={{ borderBottomWidth: 1, marginBottom: 15 }}
            keyboardType="numeric"
            maxLength={3}
            value={age}
            onChangeText={setAge}
          />
        </View>
      )}
      <Text>Patient Relationship</Text>
      <Picker selectedValue={relationship} onValueChange={setRelationship} style={{ marginBottom: 15 }}>
        <Picker.Item label="Father" value="father" />
        <Picker.Item label="Mother" value="mother" />
        <Picker.Item label="Brother" value="brother" />
        <Picker.Item label="Sister" value="sister" />
        <Picker.Item label="Son" value="son" />
        <Picker.Item label="Daughter" value="daughter" />
        <Picker.Item label="Friend" value="friend" />
        <Picker.Item label="Guardian" value="Guardian" />
      </Picker>
      <Text> Notes</Text>
      <TextInput
        style={{ borderBottomWidth: 15, bottomWidth: 1 }}
        multiline
        value={notes}
        onChangeText={setNotes}
      />

      <Button Title="register" onPress={handleRegister} />
    </ScrollView>

  );
};
const RadioButton = ({ selected, onPress }) => (
  <Text style={{ marginLeft: 10, marginRight: 10 }} onPress={onPress}>
    {selected ? '◉' : '◯'}
  </Text>
);

export default App;