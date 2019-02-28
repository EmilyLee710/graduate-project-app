import { createStackNavigator } from 'react-navigation';
import RestaurantList from './RestaurantList';
import RestaurantDetail from './RestaurantDetail';
import FoodDetail from '../Food/FoodDetail';
const MyStack = createStackNavigator({
    RestaurantList: {
        screen: RestaurantList,
        navigationOptions: {
            title: '优选餐厅',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center'
            },
        }
    },
    RestaurantDetail: {
        screen: RestaurantDetail,
        navigationOptions: {
            title: '餐厅详情',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }, FoodDetail: {
        screen: FoodDetail,
        navigationOptions: {
            title: '菜品详情',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
                marginLeft: -30
            },
        }
    }
}, {
    initialRouteName: 'RestaurantList'
});
export default MyStack;
