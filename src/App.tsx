import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Container, Typography } from "@mui/joy";
import { useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import ProductFormModal from "./components/ProductFormModal";
import ProductList from "./components/ProductList";
import { Product } from "./models/entities";
import store from "./redux/store";

function App() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpen = (product?: Product) => {
    setSelectedProduct(product ?? null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Provider store={store}>
      <Container>
        <Box my={4} display="flex" justifyContent="space-between" alignItems="center">
          <Typography level="h1" fontWeight={800} gutterBottom>
            La boutique en ligne
          </Typography>
          <Button color="primary" startDecorator={<AddIcon fontSize="small" />} onClick={() => handleOpen()}>
            Ajouter un produit
          </Button>
        </Box>
        <ProductList onEdit={handleOpen} />
        <ProductFormModal open={open} onClose={handleClose} product={selectedProduct} />
      </Container>
    </Provider>
  );
}

export default App;
