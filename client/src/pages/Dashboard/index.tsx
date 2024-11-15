import axios from "axios";
import { useState } from "react";
import InfoContainer from "./components/InfoContainer"

const Dashboard = () => {
  const [isUploadOltpLoading, setIsUploadOltpLoading] = useState(false);
  const [isRunEtlLoading, setIsRunEtlLoading] = useState(false);
  const [isSynchronizeOlapLoading, setIsSynchronizeOlapLoading] = useState(false);

  const buttonDisabled = isUploadOltpLoading || isRunEtlLoading || isSynchronizeOlapLoading;

  const uploadOltp = async () => {  
    setIsUploadOltpLoading(true);
    await axios.post('http://localhost:3001/oltp-olap/upload-oltp');
    setIsUploadOltpLoading(false);
  }

  const runEtl = async () => {  
    setIsRunEtlLoading(true);
    await axios.post('http://localhost:3001/oltp-olap/run-etl');
    setIsRunEtlLoading(false);
  }

  const synchronizeOlap = async () => {
    setIsSynchronizeOlapLoading(true);
    await axios.post('http://localhost:3001/oltp-olap/run-etl');
    setIsSynchronizeOlapLoading(false);
  }

  return (
    <div className="w-full h-screen bg-[#C8BCF6] flex p-[32px] pt-[96px] flex-col justify-start gap-8">
      <p className="text-2xl font-medium ml-8">
        Dashboard
      </p>
      <div className="w-full h-[50%] flex gap-16 flex-wrap justify-center">
        <InfoContainer
          title="Upload OLTP"
          buttonText="Do it!"
          buttonDisabled={buttonDisabled}
          isLoading={isUploadOltpLoading}
          description="This option allows you to upload OLTP (Online Transaction Processing) data from various datasets"
          handleClick={uploadOltp}
        />
         <InfoContainer
          title="Run ETL"
          buttonText="Do it!"
          buttonDisabled={buttonDisabled}
          isLoading={isRunEtlLoading}
          description="This option executes the ETL process, uploading data from the OLTP database to the OLAP one"
          handleClick={runEtl}
        />
        <InfoContainer
          title="Synchronize OLAP"
          buttonText="Do it!"
          buttonDisabled={buttonDisabled}
          isLoading={isSynchronizeOlapLoading}
          description="This option synchronized the OLAP database, filling it with the new data from the OLTP database"
          handleClick={synchronizeOlap}
        />
      </div>
    </div>
  )
}

export default Dashboard