 Vue.component("addmanager", {
	data: function () {
		    return {
		      	username:null
		      	
		    }
	},
	template: `
	<div>
		<table>
	        <tr>
	            <td>Username:</td>
	            <td><input type="text"></td>
	        </tr>
	        <tr>
	            <td>Password:</td>
	            <td><input type="password"></td>
	        </tr>
	        <tr>
	            <td>First_name:</td>
	            <td><input type="text"></td>
	        </tr>
	        <tr>
	            <td>Last_name:</td>
	            <td><input type="text"></td>
	        </tr>
	        <tr>
	            <td>Gender:</td>
	            <td>
	                <select>
	                    <option value="Male">Male</option>
	                    <option value="Female">Female</option>
	                </select>
	            </td>
	        </tr>
	        <tr>
	            <td>Birth_date</td>
	            <td><input type="date"></td>
	        </tr>
	        <tr>
	            <td>Rental_agency_id:</td>
	            <td><input type="number"></td>
	        </tr>
    	</table>
    </div>	
    `
	, 
	methods : {
		
	},
	mounted () {	
    }
});