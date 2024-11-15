import { useEffect, useState } from "react";
import axios from 'axios'
import MUIDataTable, { MUIDataTableMeta } from 'mui-datatables';
import CustomModal from "../../components/CustomModal";
import AddItemModalContent from "./components/AddItemModalContent";
import { CircularProgress } from "@mui/material";
import Analytics from "../../components/Analytics";
import EditItemModalContent from "./components/EditItemModalContent";

const getColumns = (onEdit: (id: string) => void, onDelete: (id: string) => void) => [
  {
    name: 'customer_order_id',
    label: 'Order Id',
    options: {
      customBodyRender: (value: string) => `#${value}`,
      filter: false,
    }
  },
  {
    name: 'Restaurant.name',
    label: 'Restaurant',
    options: {
      filter: false,
    }
  },
  {
    name: 'Restaurant.RestaurantAddress.Address.City.city',
    label: 'Restaurant Address',
    options: {
      customBodyRender: (value: string, data: MUIDataTableMeta) => {
        const longtitude = data.rowData.at(-4);
        const latitude = data.rowData.at(-3);
        const streetName = data.rowData.at(-2);

        return `${value}, ${streetName}, ${longtitude}, ${latitude}`
      },
      filter: false,
    }
  },
  {
    name: 'Person.name',
    label: 'Customer',
    options: {
      customBodyRender: (value: string, data: MUIDataTableMeta) => {
        const surname = data.rowData.at(-1)
        return `${value} ${surname}`
      },
      filter: false,
    }
  },
  {
    name: 'type_of_order',
    label: 'Type of Order',
  },
  {
    name: 'status',
    label: 'Status',
  },
  {
    name: 'price',
    label: 'Price',
    options: {
      customBodyRender: (value: string) => {
        return `$${value}`
      },
      filter: false,
    }
  },
  {
    name: '',
    label: '',
    options: {
      customBodyRender: (value: string, data: MUIDataTableMeta) => {
        const id = data.rowData.at(0);
        return (
          <button
            onClick={() => onEdit(id)}
            className="flex gap-4 items-center self-end justify-center h-[30px] w-[60px] rounded-lg bg-[#C8BCF6] shadow-md mt-4"
          >
            <p className='text-[16px] font-medium'>
              Edit
            </p>
          </button>
        )
      },
      filter: false,
      sort: false,
      download: false,
      print: false,
    }
  },
  {
    name: '',
    label: '',
    options: {
      customBodyRender: (value: string, data: MUIDataTableMeta) => {
        const id = data.rowData.at(0);
        return (
          <button
            onClick={() => onDelete(id)}
            className="flex gap-4 items-center self-end justify-center h-[30px] w-[60px] rounded-lg bg-[#C8BCF6] shadow-md mt-4 mr-4"
          >
            <p className='text-[16px] font-medium'>
              Delete
            </p>
          </button>
        )
      },
      filter: false,
      sort: false,
      download: false,
      print: false,
    }
  },

  // Addtional columns
  {
    name: 'Restaurant.RestaurantAddress.Address.longtitude',
    options: {
      viewColumns: false,
      filter: false,
      display: false,
      download: false,
    },
  },
  {
    name: 'Restaurant.RestaurantAddress.Address.latitude',
    options: {
      viewColumns: false,
      filter: false,
      display: false,
      download: false,
    },
  },
  {
    name: 'Restaurant.RestaurantAddress.Address.street_name',
    options: {
      viewColumns: false,
      filter: false,
      display: false,
      download: false,
    },
  },
  {
    name: 'Person.surname',
    options: {
      viewColumns: false,
      filter: false,
      display: false,
      download: false,
    },
  },
]

const CustomerOrder = () => {
  const [data, setData] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3001/customer-order');
      setData(response.data);
      setIsLoading(false)
    } catch (error) {
      console.log('error: ', error)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    setEditRowId(id);
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:3001/customer-order/${id}`);
    await fetchData();
  }

  return (
    <div className="w-full bg-[#C8BCF6] flex gap-8 p-[32px] pt-[96px] flex-col">
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="flex gap-4 items-center self-end justify-center h-[30px] w-[85px] rounded-lg bg-white shadow-md"
      >
        <p className='text-[14px] font-medium'>
          Add more
        </p>
      </button>
      <MUIDataTable
        title="Customer Orders"
        data={data}
        columns={getColumns(handleEdit, handleDelete)}
        options={{
          filter: true,
          filterType: 'dropdown',
          responsive: 'standard',
          enableNestedDataAccess: '.',
          viewColumns: true,
          selectableRows: 'none',
          textLabels: {
            body: {
              noMatch: isLoading ? (
                <CircularProgress sx={{ color: '#C8BCF6' }} />
              ) : 'Sorry, no customer orders found'
            }
          },
          customFilterDialogFooter: () => <div className="min-w-[250px]" />
        }}
      />
      <p className="text-2xl font-medium ml-8">
        Analytics
      </p>
      <Analytics url="https://public.tableau.com/views/Book1_17142191098430/Dashboard1" />
      <CustomModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <AddItemModalContent 
          onClose={() => {
            setIsAddModalOpen(false)
            fetchData();
          }} 
        />
      </CustomModal>
      <CustomModal
        open={editRowId !== null}
        onClose={() => setEditRowId(null)}
      >
        <EditItemModalContent 
          onClose={() => {
            setEditRowId(null)
            fetchData();
          }} 
          id={editRowId as string}
        />
      </CustomModal>
    </div>
  );
};

export default CustomerOrder;
