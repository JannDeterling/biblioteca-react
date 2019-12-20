import * as React from "react";
import {Carousel} from "../carousel/Carousel";
import "./home.css";

const library1 = require("./library-1.jpg");
const library2 = require("./library-2.jpg");
const library3 = require("./library-3.jpg");


export class Home extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            images: [
                library1, library2, library3
            ]
        }
    }

    render() {
        return (
            <div className={"home-container"}>
                <h1>Welcome to Biblioteca!</h1>
                <h3>Your one one-stop-shop for books in Bangalore</h3>
                <Carousel images={this.state.images}/>
                <div className={"home-body"}>
                    <p>
                        Home to over 3,140,000 books, with a copy of every book ever published in the State, The Sir
                        Seshadri Iyer Memorial Library or the State Central Library is nothing short of iconic. With its
                        instantly recognisable bright brick red walls and its central location within the lush green of
                        Cubbon Park, the State Central Library is one of the city’s biggest cultural sites and
                        landmarks. The biggest library in the State, its shelves are packed with everything from
                        periodical publications to books in braille, so if it’s knowledge you seek, you’ve come to the
                        right place. The library’s brick-red walls have seen over a century (104 in 2019) of growth and
                        change in the city and have their own story to tell, apart from the many in their books, that
                        is.<br/>

                        Looking for a quiet spot with easy access to information, to hit the books? Well, this is it!
                        Free from distraction and stress, the State Central Library is where you can bury your head deep
                        in those books and prepare for whichever competitive exam it is you have to ace. These walls
                        have seen the hopes and hard work of many an IAS and KAS aspirant. And like we mentioned, the
                        place is stocked up on plenty of academic books, research material and rare periodicals that you
                        can get your hands on and read through.
                    </p>
                </div>
            </div>
        );
    }
}