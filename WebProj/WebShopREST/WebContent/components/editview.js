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
		<form style="overflow:auto;height:100vh;background-color:#dbf9f0">

<header>
            <label class="header">Rent a car</label>
            <nav>
                <ul class="nav_links">
                </ul>
            </nav>
            <a class="nav_a"><button class="nav_button">{{this.username}}</button></a>
        </header>
	
    <table>
    	<tr style="border: none;">
    		<td style="border: none;" colspan="2">
    			<p style="text-decoration:underline;font-size:24px;font-weight:900;text-align:center;">Edit user:<p>
        	</td>
        </tr>
        <tr style="border: none;">
            <td style="border: none;"><label>First name:</label></td>
            <td style="border: none;">
            	<input type="text" v-model="user.first_name">
            	<label v-if="invalidName" class="invalid_input_label">Invalid name!</label>
            </td>
        </tr>
        <tr style="border: none;">
            <td style="border: none;"><label>Last name:</label></td>
            <td style="border: none;">
            	<input type="text" v-model="user.last_name">
            	<label v-if="invalidSurname" class="invalid_input_label">Invalid surname!</label>
            </td>
        </tr>
        <tr style="border: none;">
            <td style="border: none;"><label>Gender:</label></td>
            <td style="border: none;">
                <select v-model="user.gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </td>
        </tr>
        <tr style="border: none;">
            <td style="border: none;"><label>Date of birth:</label></td>
            <td style="border: none;">
            	<input type="date" v-model="user.birth_date">
            	<label v-if="invalidBirthDate" class="invalid_input_label">Invalid birth date!</label>
            </td>
            
        </tr>
        <tr style="border: none;">
            <td style="border: none;" colspan="2">
                <input type="submit" class="nav_button" value="Confirm" v-on:click="ConfirmButton(username)">
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
				axios.put('rest/users/updateUser/',this.user).then(response=>{
														//router.push(`/view/${username}`);
														var self = this;
														if(self.user.type === 'Manager'){
															router.push(`/managerprofile/${self.user.username}`);
															
														}
														if(self.user.type === 'Administrator'){
															router.push(`/view/${self.user.username}`);
															
														}
														if(self.user.type === 'Buyer'){
															router.push(`/view/${self.user.username}`);
															
														}
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