import {useActivePage, useDocumentTitle} from "../../../../hooks";
import {BodyContainer, PageTitles} from "../../../../components";
import {memo} from "react";
import {useParams} from "react-router-dom";
import {useGetUniqueProduitQuery, useUpdateProduitImageMutation} from "../model/produit.api.slice.ts";
import {Card, Col, Row} from "react-bootstrap";
import {ImageLoader} from "../../../../loaders";
import UniqueProduitImageForm from "./UniqueProduitImageForm.tsx";
import LogoLoader from "../../../../loaders/LogoLoader.tsx";
import UniqueProduitData from "./UniqueProduitData.tsx";
import LotProductsByProductData from "./LotProductsByProductData.tsx";

function ShowProduit() {
  
  useDocumentTitle('Produit')
  useActivePage('pharmacy')
  
  const [onUpdateProduitImage, { isLoading: isEditImageleLoading }] = useUpdateProduitImageMutation()
  
  const { id } = useParams()
  const { data, isLoading, isFetching, isError, refetch } = useGetUniqueProduitQuery(id)
  
  const onRefresh = async (): Promise<void> => { await refetch() }
  
  return (
    <BodyContainer>
      <PageTitles title='Produit' />
      <Row>
        <Col md={4} className='mb-3'>
          {!(isLoading && isError) && data && (
            <UniqueProduitImageForm
              produit={data}
              loader={isLoading}
              onRefresh={onRefresh}
              onSubmit={onUpdateProduitImage}
              isLoading={isEditImageleLoading}
            />)}
          {isLoading && <ImageLoader/>}
        </Col>
        
        <Col md={8} className='mb-3'>
          <Card>
            <Card.Body>
              {isLoading && <LogoLoader/>}
              {!(isLoading || isError) && data && (
                <UniqueProduitData
                  produit={data}
                  onRefresh={onRefresh}
                  isFetching={isFetching}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {!(isLoading && isError) && data && (
        <LotProductsByProductData product={data} />
      )}
    </BodyContainer>
  )
  
}

export default memo(ShowProduit)
