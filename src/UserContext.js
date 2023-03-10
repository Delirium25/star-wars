export default class UserContext {

    constructor(userData, setUserData, localStorage) {
        this.userData = userData;
        this.setUserData = setUserData;
        this.localStorage = localStorage;
    }

    loginUser(data) {
        localStorage.setItem('Authorization', JSON.stringify(data));
        this.setUserData(data)
        console.log("User logged in!")
    }

    logOut() {
        localStorage.removeItem('Authorization')
        this.setUserData(null)
        console.log("User logged out!")
    }

    isLoggedIn() {
        return this.userData != null
    }

    displayName() {
        return this.userData.user.firstName + " " + this.userData.user.lastName
    }

    loadStoredUserData() {
        let storedData = localStorage.getItem('Authorization')

        if (storedData !== null) {
            let data = JSON.parse(storedData)
            this.setUserData(data)
        }
    }
}