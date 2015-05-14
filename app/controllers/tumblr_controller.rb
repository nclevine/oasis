class TumblrController < ApplicationController

  def search
    search_term = params[:keyword]
    url = "http://api.tumblr.com/v2/tagged?api_key=#{ENV['tumblr']}&type=photo&tag=#{search_term}"
    @response = HTTParty.get(url)
    render json: @response
  end

  def lookup
    blog_name = params[:blogName]
    object_id = params[:objectID]
    url = "http://api.tumblr.com/v2/blog/#{blog_name}.tumblr.com/posts?api_key=#{ENV['tumblr']}&id=#{object_id}"
    @response = HTTParty.get(url)
    render json: @response
  end

end