Vue.component("administratorview", {
	data: function () {
		    return {
		      	username:null
		      	
		    }
	},
	template: ` 
	<div>
		<input type="button" value="Administrator View Users" @click="viewUsers" >
	    <input type="button" value="Administrator Add Menager" @click="addManager" >
	    <input type="button" value="Add Rental Agency" @click="addAgency" >
    </div>
    `
	, 
	methods : {
		viewUsers: function(){
			router.push(`/viewUsers/${this.username}`);
		},
		addManager:function(){
			router.push(`/addManager/${this.username}`);
		},
		addAgency: function(){
			router.push(`/addAgency/${this.username}`);
		}
		
	},
	mounted () {
		this.username=this.$route.params.username;
    }
});