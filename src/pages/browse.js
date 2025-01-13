import React from "react";
import { useContent } from "../hooks"; 
import {selectionFilter} from "../utils";
import { BrowseContainer } from "../containers/browse";

export default function Browse(){
    // we need the sries and the movies
    const { series } = useContent('series');
    const { films } = useContent('films');
    //we need slides
    const slides = selectionFilter({ series, films});
    //console.log(slides);
    // pass it to the browse container

    return <BrowseContainer slides = {slides} />;
}