import { getDownloadURL } from 'firebase/storage'

export function onProgress(snapshot, setStatus) {
  const progress = Math.round(
    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  )
  console.log('Upload is ' + progress + '% done')
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused')
      break
    case 'running':
      console.log('Upload is running')
      break
  }
  setStatus(2)
}

export function onError(err) {
  console.error(err)
}

export function onSuccess(task, setImgURL, setStatus) {
  console.log('Success, image uploaded')
  getDownloadURL(task.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL)
    setImgURL(downloadURL)
  })
  setStatus(3)
}
