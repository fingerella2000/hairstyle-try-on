import { CLIENT_ID, CLIENT_SECRET} from "@env"

export const getAccessToken = async (serviceType) => {
  if (serviceType == 'ml') {
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials'); 
    formData.append('client_id', CLIENT_ID); 
    formData.append('client_secret', CLIENT_SECRET); 
    formData.append('resource', 'https://ml.azure.com'); 
  
    return fetch('https://login.microsoftonline.com/784a625a-3383-4ec8-82f1-4525122fde6c/oauth2/token', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      }).then((response) => response.json()).catch((error) => {
        console.error(error);
    });
  }

  if (serviceType == 'storage') {
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials'); 
    formData.append('client_id', CLIENT_ID); 
    formData.append('client_secret', CLIENT_SECRET); 
    formData.append('resource', 'https://storage.azure.com'); 
  
    return fetch('https://login.microsoftonline.com/784a625a-3383-4ec8-82f1-4525122fde6c/oauth2/token', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      }).then((response) => response.json()).catch((error) => {
        console.error(error);
    });
  }

  if (serviceType == 'management') {
    const formData = new FormData();
    formData.append('grant_type', 'client_credentials'); 
    formData.append('client_id', CLIENT_ID); 
    formData.append('client_secret', CLIENT_SECRET); 
    formData.append('resource', 'https://management.azure.com'); 
  
    return fetch('https://login.microsoftonline.com/784a625a-3383-4ec8-82f1-4525122fde6c/oauth2/token', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      }).then((response) => response.json()).catch((error) => {
        console.error(error);
    });
  }
};

export const uploadIdentity = async (access_token, file_path, user_id) => {
  return fetch(file_path) // read file
  .then(response => response.arrayBuffer())
  .then(buffer => {
    const uintArray = new Uint8Array(buffer); // get file content as binary
    const headerBytes = uintArray.subarray(0, 4);
    let fileType = 'N/A';
    let fileExt = 'N/A';
    
    if (headerBytes[0] === 0xFF && headerBytes[1] === 0xD8) {
      fileType = 'image/jpeg';
      fileExt = 'jpg';
    }
    if (headerBytes[0] === 0x89 && headerBytes[1] === 0x50 && headerBytes[2] === 0x4E && headerBytes[3] === 0x47) {
      fileType = 'image/png';
      fileExt = 'png';
    }
    if (headerBytes[0] === 0x47 && headerBytes[1] === 0x49 && headerBytes[2] === 0x46) {
      fileType = 'image/gif';
      fileExt = 'gif';
    }
    if (headerBytes[0] === 0x42 && headerBytes[1] === 0x4D) {
      fileType = 'image/bmp';
      fileExt = 'bmp';
    }

    if (fileType == 'N/A') {
      console.log("The file is not an image.");
    } else {
      console.log(`The file type is ${fileType}.`);

      const requestUri = `https://mlworkspaceuk2288885558.blob.core.windows.net/azureml-blobstore-eb877bd2-e86d-4fcd-9cc8-4dde86e73c5c/LocalUpload/input-face/${user_id}/${user_id}/identity/id.${fileExt}`;
      // upload image to azure ml workspace
      fetch(requestUri, {
          method: 'PUT',
          headers: {
            'Content-Type': fileType,
            Authorization: `Bearer ${access_token}`,
            'x-ms-version': '2017-11-09',
            'x-ms-blob-type': 'BlockBlob',
          },
          body: uintArray,
        }).then((response) => {
          // console.log('response is:' + JSON.stringify(response));
        }).catch((error) => {
          console.error(error);
      });
    }
  }).catch(error => {
    console.error("Error reading the file:", error);
  });
}

export const uploadReference = async (access_token, file_path, user_id) => {
  return fetch(file_path) // read file
  .then(response => response.arrayBuffer())
  .then(buffer => {
    const uintArray = new Uint8Array(buffer); // get file content as binary
    const headerBytes = uintArray.subarray(0, 4);
    let fileType = 'N/A';
    let fileExt = 'N/A';
    
    if (headerBytes[0] === 0xFF && headerBytes[1] === 0xD8) {
      fileType = 'image/jpeg';
      fileExt = 'jpg';
    }
    if (headerBytes[0] === 0x89 && headerBytes[1] === 0x50 && headerBytes[2] === 0x4E && headerBytes[3] === 0x47) {
      fileType = 'image/png';
      fileExt = 'png';
    }
    if (headerBytes[0] === 0x47 && headerBytes[1] === 0x49 && headerBytes[2] === 0x46) {
      fileType = 'image/gif';
      fileExt = 'gif';
    }
    if (headerBytes[0] === 0x42 && headerBytes[1] === 0x4D) {
      fileType = 'image/bmp';
      fileExt = 'bmp';
    }

    if (fileType == 'N/A') {
      console.log("The file is not an image.");
    } else {
      console.log(`The file type is ${fileType}.`);

      const requestUri = `https://mlworkspaceuk2288885558.blob.core.windows.net/azureml-blobstore-eb877bd2-e86d-4fcd-9cc8-4dde86e73c5c/LocalUpload/input-face/${user_id}/${user_id}/reference/ref.${fileExt}`;
      // upload image to azure ml workspace
      fetch(requestUri, {
          method: 'PUT',
          headers: {
            'Content-Type': fileType,
            Authorization: `Bearer ${access_token}`,
            'x-ms-version': '2017-11-09',
            'x-ms-blob-type': 'BlockBlob',
          },
          body: uintArray,
        }).then((response) => {
          // console.log('response is:' + JSON.stringify(response));
        }).catch((error) => {
          console.error(error);
      });
    }
  }).catch(error => {
    console.error("Error reading the file:", error);
  });
}

export const blendHair = async (access_token, user_id) => {
  const requestUri = `https://barbershop-batch.ukwest.inference.ml.azure.com/jobs`;
  const payload = {
    "properties": {
        "InputData": {
            "original_hair": {
                "JobInputType": "UriFolder",
                "Uri": `azureml://subscriptions/a1266c53-9bc0-48f4-8b55-6cb3829bb713/resourcegroups/fingerella2000-rg/workspaces/ml-workspace-uk/datastores/workspaceblobstore/paths/LocalUpload/input-face/${user_id}/`
            }
        }
    }
  };
  
  // send request to azure ml workspace to start hair blending
  return fetch(requestUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(payload),
    }).then(response => {
      // console.log('response is:' + JSON.stringify(response));
      return response.json();
    }).then(data => {
      // Process the JSON data from the response body
      console.log('job name:', data.name);
      return data;
    }).catch(error => {
      console.error(error);
  });
}

export const sendPushNotification = async (push_token, job_name) => {
  const requestUri = 'http://ubuntu1804.westus2.cloudapp.azure.com:3000/send-notification';

  const payload = {
    "pushToken": [push_token],
    "jobName": job_name,
  };
  
  // send request to azure ml workspace to get hair blending job status
  return fetch(requestUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(response => {
    console.log('response is:' + JSON.stringify(response));
  }).catch(error => {
    console.error(error);
});
}