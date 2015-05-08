class ArtworksController < ApplicationController

  def index
    @space = current_user.space
    @artworks = @space.artworks
    render json: @artworks
  end

  def show
    @artwork = Artwork.find(params[:id])
    render json: @artwork
  end

  def create
    @space = current_user.space
    @artwork = @space.artworks.create(artwork_params)
    render json: @card
  end

  def update
    @artwork = Artwork.find(params[:id])
    @artwork.update(artwork_params)
    render json: @card
  end

  def destroy
    @artwork = Artwork.find(params[:id])
    @artwork.destroy
    render nothing: true
  end

  private
  def artwork_params
    params.require(:artwork).permit(:title, :artist, :date, :width, :height, :xpos, :ypos)
  end
end