Vue.component("editview", {
	data: function () {
		    return {
		      	username:null,
		      	user:{},
		      	invalidName: null,
		      	invalidSurname: null,
		      	invalidBirthDate: null
		    }
	},
	template: ` 
		<form>
    <table>
        <tr>
            <td><label>First name:</label></td>
            <td>
            	<input type="text" v-model="user.first_name">
            	<label v-if="invalidName" class="invalid_input_label">Invalid name!</label>
            </td>
        </tr>
        <tr>
            <td><label>Last name:</label></td>
            <td>
            	<input type="text" v-model="user.last_name">
            	<label v-if="invalidSurname" class="invalid_input_label">Invalid surname!</label>
            </td>
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
            <td>
            	<input type="date" v-model="user.birth_date">
            	<label v-if="invalidBirthDate" class="invalid_input_label">Invalid birth date!</label>
            </td>
            
        </tr>
        <tr>
            <td></td>
            <td>
                <input type="submit" value="Confirm" v-on:click="ConfirmButton(username)">
            </td>
        </tr>
    </table>
    
    </form>
    
    `
	, 
	methods : {
		ConfirmButton:function(username){
			
			this.invalidName = false;
			this.invalidSurname = false;
			this.invalidDateBirth = false;
		
			var rgName = /^[A-Z][a-z]{1,}$/;
			this.invalidName = !rgName.test(this.user.first_name) || (this.user.first_name===null);
			
			this.invalidSurname = !rgName.test(this.user.last_name) || (this.user.last_name===null);
			
			var currentDate = new Date().toLocaleDateString("en-IN");;
			this.invalidBirthDate = (this.user.birth_date >= currentDate) || (this.user.birth_date===null);
			
			var self = this;
			
			if(this.invalidBirthDate || this.invalidSurname || this.invalidName){
				return;
			}
			else{
				axios.put('rest/users/',this.user).then(response=>{
														router.push(`/view/${username}`);
														self.invalidName = false;
														self.invalidSurname = false;
														self.invalidDateBirth = false;
														})
			}
		}
	},
	mounted () {
		
		this.username=this.$route.params.username;
		axios.get('rest/users/'+this.username)
			.then(response => (this.user=response.data))
			
    }
});