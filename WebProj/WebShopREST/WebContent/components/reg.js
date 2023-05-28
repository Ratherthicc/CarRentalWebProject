Vue.component("register", {
	data: function () {
		    return {
		      
		    }
	},
	template: ` 
		<table>
            <tr>
                <td><label>Username:</label></td>
                <td><input name="username" type="text"></td>
            </tr>
            <tr>
                <td><label>Password:</label></td>
                <td><input name="password" type="password"></td>
            </tr>
            <tr>
                <td>First Name:</td>
                <td><input name="firstname" type="text"></td>
            </tr>
            <tr>
                <td><label>Last Name:</label></td>
                <td><input name="lastname" type="text"></td>
            </tr>
            <tr>
                <td>Gender:</td>
                <td>
                    <select name="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                </select>
            </td>
            </tr>
            <tr>
                <td><label>Date of birth:</label></td>
                <td><input name="date" type="date"></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="submit" value="Register" v-on:click="registerUser"></td>
            </tr>
        </table>
    
    `
	, 
	methods : {
		registerUser:function(){
			
		}
		
	},
	mounted () {
    }
});