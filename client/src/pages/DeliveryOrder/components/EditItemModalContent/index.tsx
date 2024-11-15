import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { formatDate } from "../../../../helpers/formatDate";

type EditItemModalContentProps = {
  onClose: () => void;
  id: string;
}

const EditItemModalContent: FC<EditItemModalContentProps> = ({ onClose, id }) => {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [customerOrders, setCustomerOrders] = useState([])
  const [trafficDensity, setTrafficDensity] = useState([]);
  const [areaType, setAreaType] = useState([]);
  const [deliveryPerson, setDeliveryPerson] = useState([]);

  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedCustomerOrder, setSelectedCustomerOrder] = useState<any>({});
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState<any>({});
  const [price, setPrice] = useState(1);
  const [timeTaken, setTimeTaken] = useState(15);
  const [selectedTrafficDensity, setSelectedTrafficDensity] = useState('');
  const [selectedAreaType, setSelectedAreaType] = useState('');
  const [timeOrderPicked, setTimeOrderPicked] = useState<any>(formatDate(new Date()));

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const [isReportCheckboxChecked, setIsReportCheckboxChecked] = useState(false);
  const disabled = !selectedCustomerOrder || !selectedVehicleType || !price || (isReportCheckboxChecked && (!selectedTrafficDensity || !selectedAreaType || !timeTaken || !timeOrderPicked))

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const vehicleTypesResponse = await axios.get('http://localhost:3001/delivery-order/vehicle-type');
        setVehicleTypes(vehicleTypesResponse.data);

        const customerOrderResponse = await axios.get('http://localhost:3001/customer-order');
        setCustomerOrders(customerOrderResponse.data);

        const deliveryPersonResponse = await axios.get('http://localhost:3001/delivery-order/delivery-person');
        setDeliveryPerson(deliveryPersonResponse.data);

        const trafficDensityResponse = await axios.get('http://localhost:3001/delivery-report/traffic-density');
        setTrafficDensity(trafficDensityResponse.data);

        const areaTypeResponse = await axios.get('http://localhost:3001/delivery-report/area-type');
        setAreaType(areaTypeResponse.data);

        const deliveryOrderToEdit = await axios.get(`http://localhost:3001/delivery-order/${id}`)
        const deliveryOrderData = deliveryOrderToEdit.data[0];

        setSelectedVehicleType(deliveryOrderData.vehicle_type)
        setSelectedCustomerOrder(deliveryOrderData.RestaurantOrder.CustomerOrder)
        setSelectedDeliveryPerson(deliveryOrderData.Person)
        setPrice(deliveryOrderData.price)
        setTimeTaken(deliveryOrderData.DeliveryReport?.time_taken || 1)
        setSelectedTrafficDensity(deliveryOrderData.DeliveryReport?.traffic_density || trafficDensityResponse.data[0])
        setSelectedAreaType(deliveryOrderData.DeliveryReport?.area_type || areaTypeResponse.data[0])
        const timeOrderPicked = deliveryOrderData.DeliveryReport?.time_order_picked;
        setTimeOrderPicked(formatDate(timeOrderPicked ? new Date(timeOrderPicked) : new Date()))
        setIsReportCheckboxChecked(Boolean(deliveryOrderData.DeliveryReport))

        setIsLoading(false)
      } catch (error) {
        console.log('error: ', error)
      }
    };

    fetchData();
  }, []);

  const updateDeliveryOrder = async () => {
    if(disabled) {
      setError('Specify all values correctly!')
      return;
    }

    try {
      setError('');
   
      const body = {
        customer_order_id: selectedCustomerOrder.customer_order_id,
        delivery_person_id: selectedDeliveryPerson.person_id,
        restaurant_id: selectedCustomerOrder?.restaurant_id,
        vehicle_type: selectedVehicleType,
        price,
        creation_date: selectedCustomerOrder.creation_date,
        status: selectedCustomerOrder.status,
        shouldReportBeCreated: isReportCheckboxChecked,
        time_order_picked: timeOrderPicked,
        time_taken: timeTaken,
        traffic_density: selectedTrafficDensity,
        area_type: selectedAreaType,
      };

      await axios.patch(`http://localhost:3001/delivery-order/${id}`, body);

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
        Edit delivery order
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ color: '#C8BCF6' }} />
      ) : (
        <>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={customerOrders}
              getOptionLabel={(option: any) => `#${option.customer_order_id}`}
              sx={{ width: '100%', mt: 2 }}
              renderInput={(params) => <TextField {...params} error={!selectedCustomerOrder} label="Customer Order" />}
              value={selectedCustomerOrder}
              onChange={(_, newValue: any) => setSelectedCustomerOrder(newValue)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={deliveryPerson}
              getOptionLabel={(option) => `${option.name} ${option.surname}`}
              sx={{ width: '100%', mt: 2 }}
              renderInput={(params) => <TextField {...params} error={!selectedDeliveryPerson} label="Delivery Person" />}
              value={selectedDeliveryPerson}
              onChange={(_, newValue: any) => setSelectedDeliveryPerson(newValue)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              disablePortal
              options={vehicleTypes}
              sx={{ width: '100%', mt: 2 }}
              renderInput={(params) => <TextField {...params} error={!selectedVehicleType} label="Vehicle Type" />}
              value={selectedVehicleType}
              onChange={(_, newValue: any) => setSelectedVehicleType(newValue)}
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
              inputProps={{ min: 1, max: 350 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
          </FormControl>
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                checked={isReportCheckboxChecked}
                onChange={(e: any) => setIsReportCheckboxChecked(e.target.checked)}
              />
            }
            label="Delivery Report"
          />
          {isReportCheckboxChecked && (
            <>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  options={trafficDensity}
                  sx={{ width: '100%', mt: 2 }}
                  renderInput={(params) => <TextField {...params} error={!selectedTrafficDensity} label="Traffic Density" />}
                  value={selectedTrafficDensity}
                  onChange={(_, newValue: any) => setSelectedTrafficDensity(newValue)}
                />
              </FormControl>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  options={areaType}
                  sx={{ width: '100%', mt: 2 }}
                  renderInput={(params) => <TextField {...params} error={!selectedAreaType} label="Area Type" />}
                  value={selectedAreaType}
                  onChange={(_, newValue: any) => setSelectedAreaType(newValue)}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  sx={{ width: '100%', mt: 2 }}
                  label="Time Taken"
                  type="number"
                  variant="outlined"
                  value={timeTaken}
                  onChange={(e: any) => setTimeTaken(e.target.value)}
                  error={!timeTaken}
                  inputProps={{
                    min: 1,
                    max: 120
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">minutes</InputAdornment>
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  sx={{ width: '100%', mt: 2 }}
                  type="datetime-local"
                  value={timeOrderPicked}
                  error={!timeOrderPicked}
                  onChange={(e: any) => setTimeOrderPicked(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date(selectedCustomerOrder?.creation_date).toISOString().slice(0, 16)
                  }}
                  fullWidth
                />
              </FormControl>
            </>
          )}
          {Boolean(error) && (
            <FormHelperText error>
              {error}
            </FormHelperText>
          )}
          <div className="w-full flex justify-end">
            <button
              disabled={disabled}
              onClick={updateDeliveryOrder}
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
