class RemoveTypeFromArtworks < ActiveRecord::Migration
  def change
    remove_column :artworks, :type, :string
    add_column :artworks, :source, :string
  end
end
