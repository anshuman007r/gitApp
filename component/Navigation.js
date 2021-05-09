import { createStackNavigator } from 'react-navigation-stack'
import UserListingScreen from './UserListingScreen'
import UserDetailScreen from './UserDetailScreen'

export const AppNavigator = createStackNavigator({
        UserDetailScreen: {
            screen: UserDetailScreen,
            navigationOptions: { header: null }
        },
        UserListingScreen: {
            screen: UserListingScreen,
            navigationOptions: { header: null }
        },
    },{
        initialRouteName: 'UserListingScreen',
        defaultNavigationOptions: {
          headerBackTitle: () => null,
          headerBackImage: () => null
    }
})