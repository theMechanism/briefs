class Comments < ActiveRecord::Migration
  def change
  	create_table :comments do |t|
      t.integer :sectionId
      t.integer :brief_id
      t.date :authorAvatarUrl
      t.string :authorAvatarUrl
      t.string :authorName
      t.text :comment
      t.timestamps
  	end

  end
end
