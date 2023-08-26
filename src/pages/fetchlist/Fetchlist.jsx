import React, { useEffect, useState } from "react";
import {
  Grid,
  Modal,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import api from "../../services/api";
import { appActions } from "../../redux/appRedux";
import { useDispatch } from "react-redux";
import { IMG_URL } from "../../constants";
import { textAlign } from "@mui/system";

const POKE_IMG = require("../../assets/images/poke.png");

const Fetchlist = () => {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState(null);
  const [next, setNext] = useState("");

  //chatgpt

  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      dispatch(appActions.loading(true));
      const result = await api.GET(api.pokemons);

      if (result) {
        console.log("poke: ", result);
        setPokemons(result.results);
        setNext(result.next);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(appActions.loading(false));
    }
  };

  const getPokemonImgId = (id) => {
    console.log("long. " + id.length + id);
    switch (id.length) {
      case 1:
        return `00${id}`;
      case 2:
        return `0${id}`;
      default:
        return id;
    }
  };

  //chatgpt
  const openPokemonModal = async (pokemon) => {
    try {
      dispatch(appActions.loading(true));
      const response = await api.GET(pokemon.url);

      if (response) {
        setSelectedPokemonDetails(response);
        setOpenDetailsDialog(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(appActions.loading(false));
    }
  };

  const closeDetailsDialog = () => {
    setSelectedPokemonDetails(null);
    setOpenDetailsDialog(false);
  };

  const renderModalContent = () => {
    if (!selectedPokemonDetails) {
      return null;
    }
    /*console.log(
      "ESTOY ACA" + getPokemonImgId(selectedPokemonDetails.id.toString())
    );*/

    return (
      <Dialog open={openDetailsDialog} onClose={closeDetailsDialog}>
        <DialogTitle>{selectedPokemonDetails.name}</DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            sx={{ width: 250 }}
            src={`${IMG_URL}/${getPokemonImgId(
              selectedPokemonDetails.id.toString()
            )}.png`}
            alt={selectedPokemonDetails.name}
          />
          <div>
            <h4>Habilidades:</h4>
            <ul>
              {selectedPokemonDetails.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Movimientos:</h4>
            <ul>
              {selectedPokemonDetails.moves.map((move, index) => (
                <li key={index}>{move.move.name}</li>
              ))}
            </ul>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetailsDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const loadMore = async () => {
    try {
      dispatch(appActions.loading(true));
      const result = await api.GET(next);
      if (result) {
        console.log("poke: ", result.results);
        setPokemons((prev) => [...prev, ...result.results]);
        setNext(result.next);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(appActions.loading(false));
    }
  };

  const renderItem = (item) => {
    const path = item.url.split("/");
    const imgID = getPokemonImgId(path[6]);
    console.log(`${IMG_URL}/${imgID}.png`);
    return (
      <Card
        p={2}
        sx={{
          display: "flex",
          height: 100,
          cursor: "pointer",

          "&:hover": { backgroundColor: "#5acdbd", color: "white" },
        }}
        //chatgpt
        onClick={() => openPokemonModal(item)}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            N° {imgID}
          </Typography>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          src={`${IMG_URL}/${imgID}.png`}
          alt="Live from space album cover"
        />
      </Card>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography component="div" variant="h5">
          Mi Pokedex
        </Typography>
      </Grid>
      {pokemons &&
        pokemons.map((p, index) => {
          return (
            <Grid item xs={3} key={index}>
              {renderItem(p)}
            </Grid>
          );
        })}
      <Grid item xs={12}>
        <Card
          p={4}
          sx={{
            display: "flex",
            height: 100,
            cursor: "pointer",
            backgroundColor: "#317b52",
            "&:hover": { backgroundColor: "#5acdbd" },
          }}
          onClick={() => loadMore()}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              component="div"
              variant="h3"
              sx={{ color: "white", textAlign: "center" }}
            >
              Cargar Más
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 250, p: 1 }}
            image={POKE_IMG}
            alt="Live from space album cover"
          />
        </Card>
      </Grid>
      {renderModalContent()}
    </Grid>
  );
};
export default Fetchlist;
