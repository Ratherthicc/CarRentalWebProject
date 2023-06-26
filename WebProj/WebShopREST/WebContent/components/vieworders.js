Vue.component("vieworders", {
	data: function () {
		    return {
		      	orders:[]
		      	
		    }
	},
	template: ` 
		<div>
			


		</div>
    
    `
	, 
	methods : {
		
	},
	mounted () {
		axios.get('rest/orders/')
		.then(response=>(this.orders=response.data))
			
    }
});