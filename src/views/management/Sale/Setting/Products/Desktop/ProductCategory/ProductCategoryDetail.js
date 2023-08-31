import React, { useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import EditNote from 'src/assets/img/icons/edit_note.svg';
import Upload from 'src/assets/img/icons/upload.svg';
import NewProductType from './NewProductCategory';
import SwiperImg from './Swiper';

export default function ProductTypeDetail(props) {
  const [data, setData] = useState(props.location.state.data[0]);
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(props.location.state.data[0].images);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '16px',
              gap: '50px',
              background: '#FFFFFF',
              borderRadius: '8px',
              width: '100%'
              //   height: '290px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <InputLabelHeader style={{ color: '#00346D' }}>
                مشخصات
              </InputLabelHeader>
              <ConfirmButton
                style={{
                  width: '130px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#00AAB5',
                  background: '#DDF5F6',
                  border: 'none',
                  height: '36px'
                }}
                onClick={() => {
                  setEditMode(!editMode);
                }}
              >
                <img src={EditNote} />
                ویرایش دسته
              </ConfirmButton>
            </Box>

            <Box sx={{ width: '100%' }}>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>نام:</InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.name}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>
                  ترجمه انگلیسی:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.translate_detail?.item_en}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>
                  ترجمه فارسی:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.translate_detail?.item_fa}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>
                  ترجمه عربی:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.translate_detail?.item_ar}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>
                  ترجمه روسی:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.translate_detail?.item_ru}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <Box sx={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>
                    در کاتالوگ:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.active_in_catalogue === true ? 'فعال' : 'غیر فعال'}
                  </InputLabel>
                </Box>
                <Box sx={{ display: 'inline-flex' }}>
                  <InputLabel style={{ color: '#00AAB5' }}>
                    در فروشگاه:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.active_in_shop === true ? 'فعال' : 'غیر فعال'}
                  </InputLabel>
                </Box>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 20
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>
                  ترتیب نمایش:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.order}
                </InputLabel>
              </div>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '16px 10px',
              gap: '13.26px',
              borderRadius: '8px',
              backgroundColor: 'white',
              width: '100%'
              //   height: '290px'
            }}
          >
            <InputLabelHeader style={{ color: '#00346D' }}>
              عکس دسته
            </InputLabelHeader>
            <InputLabel style={{ color: '#00346D' }}>
              عکس دسته به صورت زیر می باشد:
            </InputLabel>
            <Box sx={{ width: '100%' }}>
              {data.images.length < 0 ? (
                <Box sx={{ mt: 3 }}>
                  <Button
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '30px 0px',
                      gap: '30px',
                      width: '100%',
                      height: '150px',
                      border: '2px dashed #99DDE1',
                      borderRadius: '4px',
                      color: '#4F4C4D',
                      fontFamily: 'IRANSans',
                      fontWeight: 400,
                      fontSize: '16px'
                    }}
                    component="label"
                    onChange={event => {
                      setFile(event.target.files[0]);
                    }}
                  >
                    <img src={Upload} with="33px" height="28px" />
                    {'انتخاب فایل'}
                    <input type="file" hidden />
                  </Button>
                </Box>
              ) : (
                <SwiperImg images={images} />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      {editMode === true && (
        <NewProductType
          open={editMode}
          handleClose={() => setEditMode(false)}
          title="ویرایش دسته "
          data={data}
          type="edit"
          setImages={setImages}
          setData={setData}
        />
      )}
    </>
  );
}
