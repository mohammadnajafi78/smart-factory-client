import React, { useState } from 'react';
import { Box, Grid, Button, Divider } from '@mui/material';
import InputLabel from 'src/components/Desktop/InputLabel';
import InputLabelHeader from 'src/components/Desktop/InputLabel/InputLabelHeader';
import { Plus, Star } from 'react-feather';
import ConfirmButton from 'src/components/Desktop/Button/Confirm';
import EditNote from 'src/assets/img/icons/edit_note.svg';
import MomentFa from 'src/utils/MomentFa';
import Upload from 'src/assets/img/icons/upload.svg';
import Delete from 'src/assets/img/icons/delete.svg';
import Attach from 'src/assets/img/icons/attach.svg';
import NewProductType from './NewProduct';
import SwiperImg from './Swiper';

export default function ProductTypeDetail(props) {
  const [data, setData] = useState(props.location.state.data[0]);
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(props.location.state.data[0].images);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
                  width: '200px',
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
                ویرایش محصول
              </ConfirmButton>
            </Box>

            <Box sx={{ width: '100%' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 10
                  }}
                >
                  <InputLabel style={{ color: '#00AAB5' }}>نوع:</InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.type_detail.name_translate.item_fa}
                  </InputLabel>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 10
                  }}
                >
                  <InputLabel style={{ color: '#00AAB5' }}>سایز:</InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.size}
                  </InputLabel>
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 10
                  }}
                >
                  <InputLabel style={{ color: '#00AAB5' }}>کد:</InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.code}
                  </InputLabel>
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 10
                  }}
                >
                  <InputLabel style={{ color: '#00AAB5' }}>کد ERP:</InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.erp_code}
                  </InputLabel>
                </div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>
                  واحد منفرد:
                </InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.singular_package_detail.translate_detail.item_fa}
                </InputLabel>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <InputLabel style={{ color: '#00AAB5' }}>توضیحات:</InputLabel>
                <InputLabel style={{ color: '#335D8A' }}>
                  {data?.detail}
                </InputLabel>
              </div>

              <Divider sx={{ marginBottom: '20px' }} />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 10
                  }}
                >
                  <InputLabel style={{ color: '#00AAB5' }}>
                    بسته بندی کوچک:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.small_plural_package_detail.translate_detail.item_fa}
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
                    تعداد در بسته بندی کوچک:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.small_plural_package_qty}
                  </InputLabel>
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  width: '100%',
                  marginBottom: 10
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    marginBottom: 10
                  }}
                >
                  <InputLabel style={{ color: '#00AAB5' }}>
                    بسته بندی بزرگ:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.large_plural_package_detail.translate_detail.item_fa}
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
                    تعداد در بسته بندی بزرگ:
                  </InputLabel>
                  <InputLabel style={{ color: '#335D8A' }}>
                    {data?.large_plural_package_qty}
                  </InputLabel>
                </div>
              </div>
              <Divider sx={{ marginBottom: '20px' }} />
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
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  width: '100%',
                  marginBottom: 10
                }}
              >
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
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {editMode === true && (
        <NewProductType
          open={editMode}
          handleClose={() => setEditMode(false)}
          title="ویرایش محصول "
          data={data}
          type="edit"
          setImages={setImages}
          setData={setData}
        />
      )}
    </>
  );
}
