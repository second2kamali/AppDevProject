import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // soft light background
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#1A1F3B', // dark blue/black
    marginBottom: 5,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontFamily: 'Poppins_700Bold',
  },
  subTitle: {
    fontSize: 18,
    color: '#5B5F74', // grayish subtitle
    marginBottom: 20,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  input: {
    width:250,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginRight:3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    fontFamily: 'Poppins_400Regular',
    borderWidth:0.3
    
    
  },
  button: {
    backgroundColor: '#0057D9',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  taskStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 6,
    width: '90%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  taskFont: {
    fontSize: 16,
    color: '#222',
    fontFamily: 'Poppins_500Medium',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  up: {
    fontSize: 20,
    marginHorizontal: 6,
    marginTop:14
  },
  cancelText: {
    fontSize: 14,
    color: '#FF3B30',
    fontFamily: 'Poppins_400Regular',
  
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  deadlineBadgeGreen: {
    backgroundColor: '#4CAF50',
  },
  deadlineBadgeYellow: {
    backgroundColor: '#FFC107',
  },
  deadlineBadgeRed: {
    backgroundColor: '#FF3B30',
  },
  deadlineBadgeGray: {
    backgroundColor: '#888',
  },
});
