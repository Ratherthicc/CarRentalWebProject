Vue.component("vieworders", {
	data: function () {
		    return {
		      	orders:[]
		      	
		    }
	},
	template: ` 
		<div>
			<table>
		      <tr>
		        <th>Order Id</th>
		        <th>Agency Name</th>
		        <th>Start Date Time</th>
		        <th>Duration(in days)</th>
		        <th>Price</th>
		        <th>Firstname</th>
		        <th>Lastname</th>
		        <th>Status</th>
		      </tr>
		      <tr v-for="o in orders">
		        <td>{{o.order_id}}</td>
		        <td>{{o.agency.name}}</td>
		        <td>{{o.date_time.dayOfMonth +'-'+ o.date_time.month+'-'+o.date_time.year+' '+o.date_time.hour+':'+o.date_time.minute}}</td>
		        <td>{{o.duration}}</td>
		        <td>{{o.price}}</td>
		        <td>{{o.firstname}}</td>
		        <td>{{o.lastname}}</td>
		        <td>{{o.status}}</td>
      		  </tr>
    		</table>
			

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