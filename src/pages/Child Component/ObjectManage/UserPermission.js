import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, RadioGroup, Radio, FormControlLabel, Button, Divider } from '@mui/material'
import React, { useState } from 'react'
import FormDetailView from '../../../components/FormDetailView/FormDetailView';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add'
const styleButton = {
  display: 'flex',
  justifyContent: 'flex-end'
}
const list = [
  {
    id: 1,
    name: 'Department',
    currentuser: [
      {
        id: 2,
        username: 'Nguyen Van A',
        useremail: 'a@gmail.com',

      },
      {
        id: 3,
        username: 'Nguyen Van B',
        useremail: 'b@gmail.com'
      }
    ]
  },
  {
    id: 4,
    name: 'Employee',
    currentuser: [
      {
        id: 5,
        username: 'Ngo Quang Huy',
        useremail: 'huy@gmail.com',

      },
      {
        id: 6,
        username: 'Nguyen Hong Quan',
        useremail: 'quannguyen@gmail.com'
      },
      {
        id: 7,
        username: 'Hoang The Son',
        useremail: 'son.hoangthe@gmail.com'
      }
    ]
  },
  {
    id: 8,
    name: 'Contact',
    currentuser: [

    ]
  }
]

function UserPermission() {
  const [object, setObject] = useState('')

  

  const handleObjectChange = (e) => {
    setObject(e.target.value)
  }
  const matchObject = object !== '' ? list.find((objectInfo) => objectInfo.name === object) : {};

  return (
    <>
      <Grid container spacing={1}>
        <FormDetailView size={12}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1 }}>
            <FormControl sx={{ width: '30%' }}>
              <InputLabel id="input-object">Object</InputLabel>
              <Select
                labelId='input-object'
                label="Object"
                id='input-object'
                value={object}
                onChange={handleObjectChange}
              >
                {list.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
          <Grid item container spacing={1}>
            {object !== '' ? (
              <>
                {matchObject.currentuser.length > 0 ? (
                  <>
                    <Grid container spacing={0} sx={{ marginTop: 1 }}>
                      <Grid item xs={12} sx={{ ...styleButton, marginTop: 1 }}  >
                        <Button startIcon={<AddIcon />} variant='outlined'>
                          Add
                        </Button>
                      </Grid>

                      <Grid item xs={4} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        User
                      </Grid>

                      <Grid item xs={2} md={2}>
                        View
                      </Grid>

                      <Grid item xs={2} md={2}>
                        Create
                      </Grid>

                      <Grid item xs={2} md={2}>
                        Edit
                      </Grid>

                      <Grid item xs={2} md={2}>
                        Delete
                      </Grid>
                    </Grid>
                    {matchObject.currentuser.map((info) => (
                      <Grid key={info.id} container spacing={0} sx={{ marginTop: 1 }}>
                        <>
                          <Grid item xs={4} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <>
                              <Typography variant='subtitle1'>
                                {info.username}
                              </Typography>
                              <Typography variant='subtitle1'>
                                {info.useremail}
                              </Typography>
                            </>

                          </Grid>

                          <Grid item xs={2} md={2}>
                            <FormControlLabel value="View" control={<Radio />} />
                          </Grid>

                          <Grid item xs={2} md={2} >
                            <Radio value="Create" />
                          </Grid>

                          <Grid item xs={2} md={2}>
                            <FormControlLabel value="Edit" control={<Radio />} />
                          </Grid>

                          <Grid item xs={2} md={2}>
                            <FormControlLabel value="Delete" control={<Radio />} />
                          </Grid>
                        </>
                      </Grid>
                    ))}
                    <Grid item xs={12} sx={styleButton} >
                      <Button startIcon={<DoneIcon />} variant='contained'>
                        Save
                      </Button>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant='h3'>
                        No current user
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ ...styleButton, marginTop: 1 }}  >
                      <Button startIcon={<AddIcon />} variant='outlined'>
                        Add
                      </Button>
                    </Grid>
                  </>
                )}
              </>
            ) : (
              null
            )}

          </Grid>

        </FormDetailView>
      </Grid>
    </>
  )
}

export default UserPermission