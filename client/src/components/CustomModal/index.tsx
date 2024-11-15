import { Box, Modal, ModalProps } from "@mui/material";
import { FC } from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '90%', // Set maximum height to 90%
  overflowY: 'auto', // Enable vertical scrolling if content overflows
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const CustomModal: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Modal {...props}>
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  )
}

export default CustomModal;
