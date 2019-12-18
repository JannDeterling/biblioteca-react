
import * as React from "react";
import "./carousel.css"

export interface CarouselPictures {
    images: string[];
}

export class Carousel extends React.Component<CarouselPictures, any>{

    private buildCarouselIndicators() {
        return this.props.images.map((iamges, index) => {
            if (index === 0) {
                return <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className="active" />;
            }
            return <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} />;

        });
    }

    buildCarouselImages(){
        return this.props.images.map( (image, index) => {
            if(index === 0) {
               return (
                    <div key={index} className="carousel-item active">
                        <img src={image} className="d-block w-100 carousel-image" alt="Empty" />
                    </div>
                )
            }
            return (
                <div key={index} className="carousel-item">
                    <img src={image} className="d-block w-100 carousel-image" alt="Empty" />
                </div>
            )
        });
    }

    render() {
        return (
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    {this.buildCarouselIndicators()}
                </ol>
                <div className="carousel-inner">
                    {this.buildCarouselImages()}
                </div>
            </div>
        );
    }


}