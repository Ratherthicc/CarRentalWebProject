Vue.component("vieworders", {
	data: function () {
		    return {
				username:null,
		      	orders:[],
		      	orders_searched:[],
		      	vehicles:[],
		      	sortNameFlag:false,
		      	sortPriceFlag:false,
		      	sortDateFlag:0,
		      	search_text:"",
		      	min_price:0,
		      	max_price:100000,
		      	min_date:null,
		      	max_date:null,
		      	user:{}
		      	
		      	
		    }
	},
	template: ` 
		<div class="landingPage">
		<header>
            <label class="header">Rent a car</label>
            
        </header>
        <div class="container">
			<div class="vieworders-div-search">
				<label class="underline-label">Search:</label>
				<div class="basic-div-orderview">
					<input type="text" v-model="search_text" @keyup="updateGrid" placeholder="Search by agency name!" style="text-align: center;">
				</div>
				<label class="underline-label">Pick a price range: </label>
				<div basic-div-orderview>
					<label>Min: </label><input type="number" v-model="min_price" @keyup="updateGrid">
					&nbsp;
					<label>Max : </label><input type="number" v-model="max_price" @keyup="updateGrid">
				</div>
				<label class="underline-label">Picka a date range: </label>
				<div basic-div-orderview>
					<label>From: </label><input type="datetime-local" v-model="min_date" @change="updateGrid">
				</div>	
				<div basic-div-orderview>
					<label>To: </label>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<input type="datetime-local" v-model="max_date" @change="updateGrid">
				</div>	
				
				<input  type="button" value="refresh" @click="refreshGrid">
				
			</div>
			<div class="vieworders-table-div">
				<table id="table-vieworders">
			      <tr class="tableHeader">
			        <th>Order Id</th>
			        <th @click="sortByAgencyName">Agency Name</th>
			        <th @click="sortByDate">Start Date Time</th>
			        <th>Duration(in days)</th>
			        <th @click="sortByPrice">Price</th>
			        <th>Firstname</th>
			        <th>Lastname</th>
			        <th>Status</th>
			        <th>Cancel option</th>
			      </tr>
			      <tr v-for="o in orders_searched" @click="getVehicles(o)" class="dataRow">
			        <td>{{o.order_id}}</td>
			        <td>{{o.agency.name}}</td>
			        <td>{{o.date_time.dayOfMonth +'-'+ o.date_time.month+'-'+o.date_time.year+' '+o.date_time.hour+':'+o.date_time.minute}}</td>
			        <td>{{o.duration}}</td>
			        <td>{{o.price}}</td>
			        <td>{{o.firstname}}</td>
			        <td>{{o.lastname}}</td>
			        <td>{{o.status}}</td>
			        <td v-if="o.status === 'PROCESSING'"><input type="button" value="Cancel" @click="cancelOrder(o)" class="table-button"></td>
			        <td v-else>Unable to cancel!</td>
	      		  </tr>
	    		</table>
    		</div>
    	</div>
    		<div class="vieworders-table-div2">
				<table id="table-vieworders">
			      <tr class="tableHeader">
			        <th>Image</th>
			        <th>Brand</th>
			        <th>Model</th>
			        <th>Price</th>
			        <th>Vehicle Type</th>
			        <th>Description</th>
			
			      </tr>
			      <tr v-for="v in vehicles" class="dataRow">
			          <td><div>
			            <img v-bind:src="v.picture" class="rowTableImage"/>
			         </div></td>
			          <td>{{v.brand}}</td>
			          <td>{{v.model}}</td>
			          <td>{{v.price}}</td>
			          <td>{{v.vehicle_type}}</td>
			          <td>{{v.description}}</td>
			
			      </tr>
			    </table>
			</div>

		</div>
    
    `
	, 
	methods : {
		getVehicles: function(order){
			this.vehicles=order.vehicles;
			
		},
		cancelOrder:function(order){
			event.stopPropagation();
			axios.put('rest/orders/updateStatus/'+order.order_id+'/'+'CANCELED')
			.then(response=>{
				order.status='CANCELED';
				/*for(var o of this.orders){
					if(o.order_id==order.order_id){
						o.status='CANCELED';
					}//mozda treba
				}*/
				axios.get('rest/users/'+this.username)
				.then(response=>{
					this.user=response.data;
					if(this.user.rank=="GOLD"){
						var points=(order.price/0.95)*(-133)*4/1000;
					}
					else if(this.user.rank=="SILVER"){
						var points=(order.price/0.97)*(-133)*4/1000;
					}
					else{
						var points=(order.price)*(-133)*4/1000;
					}
					axios.put('rest/users/updatePoints/'+this.username+'/'+points)
				})
				
			})
		},
		refreshGrid:function(){
			this.min_price=0;
			this.max_price=100000;
			this.search_text="";
			this.min_date=null;
			this.max_date=null;
			this.updateGrid();
		},
		updateGrid: function(){
			this.orders_searched=this.orders.slice();
			
			var min_date_temp,max_date_temp,start_date;
			
			if(this.min_date==null){
				min_date_temp=new Date(1800, 0, 1);
			}
			else{
				min_date_temp=new Date(this.min_date);
			}
			if(this.max_date==null){
				max_date_temp=new Date(2500,0,1);
			}
			else{
				max_date_temp=new Date(this.max_date);
			}
			
			for(var variable of this.orders){
				var jsonDateTime=JSON.stringify(variable.date_time);
				const dateTimeObj = JSON.parse(jsonDateTime);
				start_date = new Date(
						dateTimeObj.year,
						dateTimeObj.monthValue - 1, //js months start from 0
						dateTimeObj.dayOfMonth,
						dateTimeObj.hour,
						dateTimeObj.minute,
						dateTimeObj.second
						);
				
				
				if(!(variable.agency.name.toLowerCase().includes(this.search_text.toLowerCase())
				 && variable.price>=this.min_price && variable.price<=this.max_price 
				 && start_date >= min_date_temp && start_date<=max_date_temp
				 )){
					const i=this.orders_searched.indexOf(variable);
					this.orders_searched.splice(i,1);
				}
			}	
		},
		sortByAgencyName: function(){
			var table, rows, switching, i, x, y, shouldSwitch;
		  table = document.getElementById("table-vieworders");
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
		  table = document.getElementById("table-vieworders");
		  switching = true;
		  while (switching) {
		    switching = false;
		    rows = table.rows;
		    for (i = 1; i < (rows.length - 1); i++) {

		      shouldSwitch = false;

		      x = rows[i].getElementsByTagName("TD")[4];
		      y = rows[i + 1].getElementsByTagName("TD")[4];
			  if(this.sortPriceFlag){
			      if (parseFloat(x.innerHTML)> parseFloat(y.innerHTML)) {
			        
			        shouldSwitch = true;
			        break;
			      	}
			     } 
			   else{
				   if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
			        
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
			  
			  var orders=response.data;
			  if(this.sortDateFlag==0){
				  this.sortDateFlag=1;
			  }
			  else{
				  this.sortDateFlag=0;
			  }
			  var array=[];
			  
			  
			  for(var item of orders){
				  const foundItem = this.orders_searched.find(item => item.order_id === item.order_id);
				  if(foundItem){
					  array.push(item);
				  }
			  }
			  this.orders_searched=array;
			  
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