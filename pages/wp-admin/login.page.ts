import BasePage from "../common/base.page";

export default class LoginPage extends BasePage {
    async enterUsername(username: string){
        await this.page.locator('#user_login').fill(username)
    }

    async enterPassword(password: string){
        await this.page.locator('#user_pass').fill(password)
    }

    async clickOnLogin(){
        await this.page.locator('#wp-submit').getByText('Log In').click()
    }
}