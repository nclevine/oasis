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
    render json: @artwork
  end

  def update
    @artwork = Artwork.find_by(apiID: params[:artwork][:apiID])
    @artwork.update(artwork_params)
    render json: @artwork
  end

  def destroy
    @artwork = Artwork.find_by(apiID: params[:artwork][:apiID])
    @artwork.destroy
    render nothing: true
  end

  private
  def artwork_params
    params.require(:artwork).permit(:apiID, :source, :title, :artist, :date, :imageURL, :xpos, :ypos, :width, :height, :zIndex)
  end
end