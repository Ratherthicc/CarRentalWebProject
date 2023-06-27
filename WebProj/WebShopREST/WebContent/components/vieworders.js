Vue.component("vieworders", {
	data: function () {
		    return {
				username:null,
		      	orders:[],
		      	orders_searched:[],
		      	vehicles:[],
		      	sortNameFlag:false,
		      	sortPriceFlag:false,
		      	sortDateFlag:0
		      	
		      	
		    }
	},
	template: ` 
		<div>
			<table id="myTable">
		      <tr>
		        <th>Order Id</th>
		        <th @click="sortByAgencyName">Agency Name</th>
		        <th @click="sortByDate">Start Date Time</th>
		        <th>Duration(in days)</th>
		        <th @click="sortByPrice">Price</th>
		        <th>Firstname</th>
		        <th>Lastname</th>
		        <th>Status</th>
		      </tr>
		      <tr v-for="o in orders_searched" @click="getVehicles(o)">
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
    		
			<table id="tableNotCentered">
		      <tr>
		        <th>Image</th>
		        <th>Brand</th>
		        <th>Model</th>
		        <th>Price</th>
		        <th>Vehicle Type</th>
		        <th>Description</th>
		
		      </tr>
		      <tr v-for="v in vehicles">
		          <td><div>
		            <img v-bind:src="v.picture" />
		         </div></td>
		          <td>{{v.brand}}</td>
		          <td>{{v.model}}</td>
		          <td>{{v.price}}</td>
		          <td>{{v.vehicle_type}}</td>
		          <td>{{v.description}}</td>
		
		      </tr>
		    </table>
			

		</div>
    
    `
	, 
	methods : {
		getVehicles: function(order){
			this.vehicles=order.vehicles;
			
			
		},
		sortByAgencyName: function(){
			var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("myTable");
		  switching = true;
		  while (switching) {
		    switching = false;
		    rows = table.rows;
		    for (i = 1; i < (rows.length - 1); i++) {

		      shouldSwitch = false;

		      x = rows[i].getElementsByTagName("TD")[1];
		      y = rows[i + 1].getElementsByTagName("TD")[1];
			  if(this.sortNameFlag){
			      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			        
			        shouldSwitch = true;
			        break;
			      	}
			     } 
			   else{
				   if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			        
			        shouldSwitch = true;
			        break;
			      	}
			   }	
		    }
		    if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      	switching = true;
		    }
		    
		  }
		  	if(this.sortNameFlag){
				this.sortNameFlag=false;
			}
			else{
				this.sortNameFlag=true;
			}
		},
		sortByPrice:function(){
			var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("myTable");
		  switching = true;
		  while (switching) {
		    switching = false;
		    rows = table.rows;
		    for (i = 1; i < (rows.length - 1); i++) {

		      shouldSwitch = false;

		      x = rows[i].getElementsByTagName("TD")[4];
		      y = rows[i + 1].getElementsByTagName("TD")[4];
			  if(this.sortPriceFlag){
			      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
			        
			        shouldSwitch = true;
			        break;
			      	}
			     } 
			   else{
				   if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
			        
			        shouldSwitch = true;
			        break;
			      	}
			   }	
		    }
		    if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      	switching = true;
		    }
		    
		  }
		  	if(this.sortPriceFlag){
				this.sortPriceFlag=false;
			}
			else{
				this.sortPriceFlag=true;
			}
		},
		sortByDate:function(){
				
			
		  axios.get('rest/orders/sortedDates/'+this.sortDateFlag)
		  .then(response=>{
			  this.orders_searched=response.data
			  if(this.sortDateFlag==0){
				  this.sortDateFlag=1;
			  }
			  else{
				  this.sortDateFlag=0;
			  }
			  })
		 }
	},
	mounted () {
		this.username=this.$route.params.username;
		
		axios.get('rest/orders/getUserOrders/'+this.username)
		.then(response=>{
			this.orders=response.data;
			this.orders_searched=response.data;
			})
			
    }
});