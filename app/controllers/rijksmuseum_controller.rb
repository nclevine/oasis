class RijksmuseumController < ApplicationController

  def search
    search_term = params[:keyword]
    url = "https://www.rijksmuseum.nl/api/en/collection?key=#{ENV['rijksmuseum']}&format=json&imgonly=true&ps=50&s=relevance&q=#{search_term}"
    @response = HTTParty.get(url)
    render json: @response
  end

  def lookup
    object_id = params[:objectID]
    url = "https://www.rijksmuseum.nl/api/en/collection/#{object_id}?key=#{ENV['rijksmuseum']}&format=json"
    @response = HTTParty.get(url)
    render json: @response
  end

end