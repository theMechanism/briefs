class AddSimilarWork < ActiveRecord::Migration
  def change
  	create_table :sites do |t|
      t.string :name
      t.integer :brief_id

      t.timestamps
    end
  end
end
