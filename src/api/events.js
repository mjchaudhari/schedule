import _ from 'lodash'
import fb from '../firebase'
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore'

/**
 * Get events
 * @param {date} start start time
 * @param {date} end end time
 */
async function getEvents (start, end) {
  const evts = []
  const p = new Promise((resolve, reject) => {
    console.log(`get events between ${start} - ${end}`)
    const q = query(collection(fb.db, 'events'), where('start', '>=', start), where('start', '<=', end))

    getDocs(q)
      .then(snapshot => {
        console.log(`Fetched ${snapshot.docs.length} records`)
        snapshot.docs.forEach(d => {
          const data = d.data()
          evts.push({
            id: d.id,
            start: typeof data.start === 'string' ? data.start : new Date(data.start.seconds * 1000),
            end: typeof data.end === 'string' ? data.end : new Date(data.end.seconds * 1000),
            venue: data.venue,
            organizer: data.organizer,
            uid: data.uid,
            category: data.category,
            name: data.name,
            color: data.color
          })
          resolve(evts)
        }, (e) => {
          console.log(e)
          reject(new Error('failed'))
        })
      })
  })

  return p
}
async function saveEvent (data) {
  const dataToSave = _.cloneDeep(data)
  const id = dataToSave.id
  delete dataToSave.id
  const p = new Promise((resolve, reject) => {
    if (id) {
      // update
      const docRef = doc(fb.db, 'events', id)
      updateDoc(docRef, dataToSave)
        .then(() => {
          console.log('updated')
          resolve()
        }, (err) => {
          console.log(err)
          reject(Error('failed'))
        })
    } else {
      // create
      try {
        // choose random color
        addDoc(collection(fb.db, 'events'), dataToSave)
          .then((docRef) => {
            console.log(docRef)
            resolve()
          }, (err) => {
            console.log(err)
            reject(Error('failed'))
          })
      } catch (error) {
        reject(Error('failed'))
      }
    }
  })
  return p
}
export default {
  getEvents,
  saveEvent
}
