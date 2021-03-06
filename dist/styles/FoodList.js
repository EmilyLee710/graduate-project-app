import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    foodimg: {
        width: 150,
        height: 200,
        marginTop: 0,
        marginLeft: 0,
        backgroundColor: 'transparent',
    },
    foodtitle: {
        fontSize: 18,
        marginTop: 10,
        color: '#d81e06'
    },
    fooding: {
        height: 20,
        width: 50,
        backgroundColor: '#d81e06',
        marginTop: 80
    },
    foodtime: {
        height: 20,
        width: 160,
        backgroundColor: 'white',
        marginTop: 160,
        opacity: 0.8,
        flexDirection: 'row'
    },
    sortmention: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '96%',
        marginLeft: '2%',
        marginTop: 10,
        marginBottom: 10
    }
});
