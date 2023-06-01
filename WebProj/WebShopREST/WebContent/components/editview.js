Vue.component("editview", {
	data: function () {
		    return {
		      	username:null,
		      	user:{}
			  		
		    }
	},
	template: ` 
		<form>
    <table>
        <tr>
            <td><label>First name:</label></td>
            <td><input type="text" v-model="user.first_name"></td>
        </tr>
        <tr>
            <td><label>Last name:</label></td>
            <td><input type="text" v-model="user.last_name"></td>
        </tr>
        <tr>
            <td><label>Gender:</label></td>
            <td>
                <select v-model="user.gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </td>
        </tr>
        <tr>
            <td><label>Date of birth:</label></td>
            <td><input type="text" v-model="user.birth_date"></td>
        </tr>
        <tr>
            <td></td>
            <td>
                <input type="submit" value="Confirm" v-on:click="ConfirmButton(username)">
            </td>
        </tr>
    </table>
    {{user}}
    </form>
    
    `
	, 
	methods : {
		ConfirmButton:function(username){
			axios.put('rest/users/',this.user)
			.then(response=>router.push(`/view/${username}`))
		}
		
	},
	mounted () {
		
		this.username=this.$route.params.username;
		axios.get('rest/users/'+this.username)
			.then(response => (this.user=response.data))
			
    }
});