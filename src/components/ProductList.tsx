import { Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/joy";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../models/entities";
import { deleteProductThunk, fetchProducts } from "../redux/productsSlice";
import { AppDispatch, RootState } from "../redux/store";

interface ProductListProps {
  onEdit: (product: Product) => void;
}

export default function ProductList({ onEdit }: ProductListProps) {
  const products = useSelector<RootState, Product[]>((state) => state.products.products);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteProductThunk(id));
  };

  return (
    <Grid container spacing={3}>
      {products.map((product: Product) => (
        <Grid xs={12} sm={6} md={4} lg={3} key={product._id}>
          <Card variant="outlined" sx={{ maxWidth: 320 }}>
            <CardContent>
              <Typography fontSize="md" fontWeight={800}>
                {product.name ?? "Non renseigné"}
              </Typography>
              <Typography fontSize="xs" color="neutral">
                {product.price ? `Prix: ${product.price}€` : "Non renseigné"}
              </Typography>
              <Typography fontSize="xs" color="neutral">
                {product.type ? `Type: ${product.type}` : "Non renseigné"}
              </Typography>
              <Typography fontSize="xs" color="neutral">
                {product.rating ? `Note: ${product.rating}` : "Non renseigné"}
              </Typography>
              <Typography fontSize="xs" color="neutral">
                {product.warranty_years ? `Garantie: ${product.warranty_years}` : "Non renseigné"}
              </Typography>
              <Typography fontSize="xs" color="neutral">
                {product.available ? "En stock" : "En rupture de stock"}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "end" }}>
              <Button color="primary" onClick={() => onEdit(product)}>
                Modifier
              </Button>
              <Button color="neutral" onClick={() => handleDelete(product._id!)}>
                Supprimer
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
