import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8AB4F8', // soft blue background
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 38,
    color: '#ffffff', // white
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontFamily: 'Poppins_700Bold',
  },
  subTitle: {
    fontSize: 22,
    color: '#E0F2FF', // lighter soft blue, subtle contrast
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    width: 250,
    backgroundColor: '#ffffff', // white input box
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
    marginRight: 16.5,
  },
  button: {
    backgroundColor: '#0057D9', // darker blue for better contrast
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 15,
    marginTop: -53,
    marginLeft: 260,
  },
  buttonText: {
    color: '#ffffff', // white text
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  taskStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  taskFont: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'Poppins_500Medium',
  },
  up: {
    fontSize: 18,
  },
  cancelText: {
    fontSize: 18,
    color: '#ff3b30',
    fontFamily: 'Poppins_400Regular',
  },
});
