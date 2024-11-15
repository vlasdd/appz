import { 
  Autocomplete, 
  CircularProgress, 
  FormControl, 
  FormHelperText, 
  InputAdornment, 
  TextField, 
  Typography,
} from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";

type EditItemModalContentProps = {
  id: string;
  onClose: () => void;
}

const EditItemModalContent: FC<EditItemModalContentProps> = ({ id, onClose }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [typeOfOrder, setTypeOfOrder] = useState([]);
  const [status, setStatus] = useState([]);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [selectedTypeOfOrder, setSelectedTypeOfOrder] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [price, setPrice] = useState(1);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const disabled = !price || !selectedTypeOfOrder || !selectedCustomer || !selectedRestaurant || !selectedStatus

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const customerResponse = await axios.get('http://localhost:3001/customer-order/customers');
        setCustomers(customerResponse.data);

        const restaurantResponse = await axios.get('http://localhost:3001/restaurant');
        setRestaurants(restaurantResponse.data);

        const typeOfOrderResponse = await axios.get('http://localhost:3001/customer-order/type-of-order');
        setTypeOfOrder(typeOfOrderResponse.data);

        const statusResponse = await axios.get('http://localhost:3001/customer-order/status');
        setStatus(statusResponse.data);

        const customerOrderToEdit = await axios.get(`http://localhost:3001/customer-order/${id}`)
        const customerOrderData = customerOrderToEdit.data[0];
        setSelectedCustomer(customerOrderData.Person)
        setSelectedRestaurant(customerOrderData.Restaurant)
        setSelectedTypeOfOrder(customerOrderData.type_of_order)
        setSelectedStatus(customerOrderData.status)
        setPrice(customerOrderData.price)

        setIsLoading(false)
      } catch (error) {
        console.log('error: ', error)
      }
    };

    fetchData();
  }, []);

  const updateCustomerOrder = async () => {
    if(disabled) {
      setError('Specify all values correctly!')
      return;
    }

    try {
      setError('');
      
      const body = {
        restaurant_id: selectedRestaurant?.restaurant_id,
        customer_id: selectedCustomer?.person_id,
        price,
        type_of_order: selectedTypeOfOrder,
        status: selectedStatus
      };
  
     await axios.patch(`http://localhost:3001/customer-order/${id}`, body);
  
      onClose();
    } catch (error) {
      setError(error as string)
      console.error('Error creating order:', error);
    }
  };

  return (
    <>
      <Typography
        fontSize={18}
        fontWeight="bold"
        marginBottom={1}
      >
        Edit customer order
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ color: '#C8BCF6' }} />
      ) : (
        <>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={customers}
              getOptionLabel={(option) => `${option.name} ${option.surname}`}
              sx={{ width: '100%', mt: 2 }}
              renderInput={(params) => <TextField {...params} error={!selectedCustomer} label="Customer" />}
              value={selectedCustomer}
              onChange={(_, newValue: any) => setSelectedCustomer(newValue)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={restaurants}
              getOptionLabel={(option) => option.name}
              sx={{ width: '100%', mt: 2 }}
              renderInput={(params) => <TextField {...params} error={!selectedRestaurant} label="Restaurant" />}
              value={selectedRestaurant}
              onChange={(_, newValue: any) => setSelectedRestaurant(newValue)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={typeOfOrder}
              sx={{ width: '100%', mt: 2 }}
              renderInput={(params) => <TextField {...params} error={!selectedTypeOfOrder} label="Type of order" />}
              value={selectedTypeOfOrder}
              onChange={(_, newValue: any) => setSelectedTypeOfOrder(newValue)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={status}
              sx={{ width: '100%', mt: 2 }}
              renderInput={(params) => <TextField {...params} error={!selectedStatus} label="Status" />}
              value={selectedStatus}
              onChange={(_, newValue: any) => setSelectedStatus(newValue)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              sx={{ width: '100%', mt: 2 }}
              label="Price"
              type="number"
              variant="outlined"
              value={price}
              onChange={(e: any) => setPrice(e.target.value)}
              inputProps={{ min: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </FormControl>
          {Boolean(error) && (
            <FormHelperText error>
              {error}
            </FormHelperText>
          )}
          <div className="w-full flex justify-end">
            <button
              disabled={disabled}
              onClick={updateCustomerOrder}
              className="flex gap-4 items-center self-end justify-center h-[35px] w-[90px] rounded-lg bg-[#C8BCF6] shadow-md mt-4"
            >
              <p className='text-[16px] font-medium'>
                Submit
              </p>
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default EditItemModalContent;